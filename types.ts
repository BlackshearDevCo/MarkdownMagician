export enum DraggableBlockTypes {
  Heading = "HEADING",
  Paragraph = "PARAGRAPH",
  CodeBlock = "CODE_BLOCK",
  List = "LIST",
  Image = "IMAGE",
  Table = "TABLE",
}

export interface Block {
  id: string;
  type: string;
  content: string;
  level?: number;
  language?: string;
  ordered?: boolean;
  rows?: number;
  columns?: number;
}
