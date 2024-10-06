export interface GaleriaItem {
    url: string;
    identificador: string;
}

export interface GraphCMSGaleriaResponse {
    galeriasConnection: {
        edges: {
            node: GaleriaItem;
        }[];
    };
}