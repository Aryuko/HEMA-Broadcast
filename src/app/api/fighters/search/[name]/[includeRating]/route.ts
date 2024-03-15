import { HEMARatingsFighterSearch } from "../../../../_helpers/HEMARatingsAPI"

export async function GET(request: Request, { params }: { params: { name: string, includeRating: boolean } }): Promise<Response> {
    const response = await HEMARatingsFighterSearch(params.name, params.includeRating)
    return Response.json(response)
}

