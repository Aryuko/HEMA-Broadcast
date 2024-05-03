import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { Colors } from "@/components/ColorPicker"
import { GraphicFightercard, GraphicFightercardForm } from "@/components/graphics/GraphicFightercard"
import { FighterResult, RatingResult } from "@/lib/InternalAPI"
import { GraphicLowerThird, GraphicLowerThirdForm } from "@/components/graphics/GraphicLowerThird"

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
    glow: boolean
}

export type GraphicPropsWithFighter = GraphicProps & {
    fighter: FighterResult,
    selectedRating: RatingResult | null,
}

const generalFormItems = {
    glow: z.boolean(),
    color: z.nativeEnum(Colors)
}
const generalFormItemDefaults = {
    glow: true,
    color: Colors.NEUTRAL
}

export const GraphicInfoList: GraphicInfo[] = [
    {
        name: 'fightercard',
        title: 'Fighter Card',
        description: 'A card full of juicy fencer information',
        path: '/config/fightercard',
        formElement: GraphicFightercardForm,
        formSchema: z.object({
            ...generalFormItems
        }),
        defaultFormValues: generalFormItemDefaults,
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
]

export function GetGraphicInfo(name: string): GraphicInfo | undefined { return GraphicInfoList.find((graphic) => graphic.name === name) }