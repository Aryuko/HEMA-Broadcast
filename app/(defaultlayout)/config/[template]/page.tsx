"use client"
import React from "react"
import copy from "copy-to-clipboard"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/shadcn-ui/input"
import { Button } from "@/components/shadcn-ui/button"
import { toast } from "sonner"
import { GetGraphicInfo, GraphicPropsWithFighter } from "@/components/graphics/Graphics"
import { ColorPicker } from "@/components/ColorPicker"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/shadcn-ui/form"
import { Switch } from "@/components/shadcn-ui/switch"
import { useLocalStorage } from "@/lib/useLocalStorage"

function ConfigurePage({ params }: { params: { template: string } }) {
    const [savedForm, saveForm] = useLocalStorage('savedForm', {})

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
        form.reset(savedForm)
    }, [])

    const graphic = GetGraphicInfo(params.template)
    if (!graphic) {
        return (
            <div className="page page-config">
                Invalid url
            </div>
        )
    }
    const form = useForm<z.infer<typeof graphic.formSchema>>({
        resolver: zodResolver(graphic.formSchema),
        defaultValues: graphic.defaultFormValues,
    })

    form.watch((data: any) => {
        if (isClient) {
            const { glow, noise } = data
            saveForm({ glow, noise })
        }
    })

    // Watch all names in the form schema
    const graphicProps = Object.fromEntries(Object.keys(graphic.formSchema.shape).map((name: string) => [name, form.watch(name)]))

    const URIEncodedData = encodeURI(JSON.stringify(graphicProps))
    const link = isClient ? `${window.location.hostname === "localhost" ? window.location.hostname : "https://" + window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/graphic/${params.template}/${URIEncodedData}` : ""
    // TODO: Add checks for all required inputs filled

    return (
        <div className="page page-config">
            <div className="config-input vertical-flex">
                <Form {...form}>
                    <div className="vertical-flex">
                        <graphic.formElement form={form} />
                        <h2 className='text-2xl text-center'>Graphic settings</h2>
                        <div className="flex flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="glow"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>
                                            Glow
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="noise"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>
                                            Noise
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <ColorPicker name={'color'} form={form} />
                        <span className="text-sm text-muted-foreground">More colours and styles coming soon!</span>
                    </div>
                </Form>
            </div>
            <div className="config-graphics vertical-flex">
                <h2 className="text-2xl text-center">Preview</h2>
                <div className={`card-wrapper vertical-flex ${graphicProps.noise && 'noise'} ${graphicProps.color} ${graphicProps.glow && 'glow'}`}>
                    <div className='card-border'>
                        <graphic.graphicElement {...(graphicProps as GraphicPropsWithFighter)} />
                    </div>
                </div>
                <h2 className="text-2xl text-center">Export</h2>
                <Input type="text" value={link} readOnly />
                <Button variant={"outline"} onClick={() => {
                    copy(link)
                    toast("Link copied", { description: "Paste the link into a browser source in OBS", duration: 2500 })
                }}>Copy link</Button>
                <Button variant={"outline"} disabled>Save as image (under construction)</Button>
            </div>
        </div>
    )
}

export default ConfigurePage