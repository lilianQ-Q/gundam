import { Site } from "./Site.type"

export type Group = {
    id: number;
    name: string;

    sites: Site[];

    createdAt: string;
    modifiedAt: string;
}