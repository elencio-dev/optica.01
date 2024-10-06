export interface Membros {
    nome: string;
    ativo: boolean;
    fotoPerfil: {
        url: string;
    };
    cvLattes: string;
    cargo: string;
}

export interface GraphCMSMembersResponse {
    membersConnection: {
      edges: {
        node: Membros;
      }[];
    };
  }