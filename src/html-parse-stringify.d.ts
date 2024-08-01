declare module "html-parse-stringify" {
    export interface INode {
        type: "tag" | "text" | "component";
        content: string;
        name: string;
        children: INode[];
        attrs: object;
    }

    export function parse(html: string): INode[];
    export function stringify(node: INode): string;
}