export interface Edital {
    createdAt: string;
    updatedAt: string;
    excerpt: string;
    content: {
        text: string;
        markdown: string;
    };
    slug: string;
    title: string;
}

export interface EditaisState {
    editaisContent: Edital[];
    fetchEditais: () => Promise<void>;
}