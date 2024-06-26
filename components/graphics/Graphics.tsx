import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { Colors } from "@/components/ColorPicker"
import { GraphicFightercard, GraphicFightercardForm } from "@/components/graphics/GraphicFightercard"
import { GraphicLowerThird, GraphicLowerThirdForm } from "@/components/graphics/GraphicLowerThird"
import { GraphicCustom, GraphicCustomForm } from '@/components/graphics/GraphicCustom'

export type GraphicInfo = {
    name: string,
    path: string,
    title: string,
    description: string,
    formElement: (props: FormElementProps) => JSX.Element,
    formSchema: z.ZodObject<any>,
    defaultFormValues: Object,
    graphicElement: ((props: GraphicProps) => JSX.Element) | ((props: GraphicPropsWithFighter) => JSX.Element) | ((props: GraphicProps & any) => JSX.Element),
}

export type FormElementProps = {
    form: UseFormReturn<any>
}

export type GraphicProps = {
    color: Colors,
    glow: boolean,
    noise: boolean
}

export type GraphicPropsWithFighter = GraphicProps & FighterProps & RatingProps

export type FighterProps = {
    name: string,
    clubName: string,
    countryCode: string, // TODO: Replace with enum
}

export type RatingProps = {
    ratingCategoryName: string,
    rank: number,
    weightedRating: number
}

const generalFormItems = {
    color: z.nativeEnum(Colors),
    glow: z.boolean(),
    noise: z.boolean()
}
export const generalFormItemDefaults = {
    color: Colors.NEUTRAL,
    glow: true,
    noise: true
}

// TODO: These (and the schemas) should be moved to the individual files
export const fighterCardFormItemDefaults = {
    ...generalFormItemDefaults,
    name: '',
    clubName: '',
    countryCode: '', // TODO: Replace with enum
    ratingCategoryName: '',
    rank: '',
    weightedRating: ''
}

export const GraphicInfoList: GraphicInfo[] = [
    {
        name: 'fightercard',
        title: 'Fighter Card',
        description: 'A card full of juicy fencer information',
        path: '/config/fightercard',
        formElement: GraphicFightercardForm,
        formSchema: z.object({
            ...generalFormItems,
            name: z.string(),
            clubName: z.string(),
            countryCode: z.string(), // TODO: Replace with enum
            ratingCategoryName: z.string(),
            rank: z.number(),
            weightedRating: z.number()
        }),
        defaultFormValues: fighterCardFormItemDefaults
        ,
        graphicElement: GraphicFightercard
    },
    {
        name: 'lowerthird',
        title: 'Lower Third',
        description: 'A smaller card to show at the bottom of the screen',
        path: '/config/lowerthird',
        formElement: GraphicLowerThirdForm,
        formSchema: z.object({
            ...generalFormItems,
            name: z.string(),
            subtitle: z.string()
        }),
        defaultFormValues: {
            ...generalFormItemDefaults,
            name: "",
            subtitle: ""
        },
        graphicElement: GraphicLowerThird
    },
    {
        name: 'custom',
        title: 'Custom Element',
        description: 'A blank canvas for you to fill with anything using markdown',
        path: '/config/custom',
        formElement: GraphicCustomForm,
        formSchema: z.object({
            ...generalFormItems,
            markdown: z.string()
        }),
        defaultFormValues: {
            ...generalFormItemDefaults,
            markdown: ''
        },
        graphicElement: GraphicCustom
    }
]

export function GetGraphicInfo(name: string): GraphicInfo | undefined { return GraphicInfoList.find((graphic) => graphic.name === name) }