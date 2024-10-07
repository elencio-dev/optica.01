export interface Attachment {
  fileName: string
  size: number
  url: string
}

export interface Edital {
  createdAt: string
  updatedAt: string
  excerpt: string
  content: {
    text: string
    markdown: string
  }
  slug: string
  title: string
  attachments: Attachment[]
}

export interface EditaisState {
  editaisContent: Edital[]
  fetchEditais: () => Promise<void>
  fetchEditalBySlug: (slug: string) => Promise<Edital | null>
}

export interface EditalResponse {
  editalConnection: {
    edges: { node: Edital }[]
  }
}

interface PostResponse {
  postsConnection: {
    edges: { node: Post }[]
  }
}
