import { Api } from "../helpers/api";

const PREFIX_URL = "/api/pedidos";

export const guardarPedido = async (producto) => {
    const result = await Api().post(`${PREFIX_URL}/guardar`,producto);
    return result;
}