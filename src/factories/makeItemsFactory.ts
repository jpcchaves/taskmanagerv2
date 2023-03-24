import {AuthState} from "../store/auth/authSlice";
import {IItems} from "../utils/SessionStorageUtils";

export const makeItems = ({user, accessToken}: AuthState): IItems[] => {
    return [
        {
            key: "accessToken",
            value: accessToken
        },
        {
            key: "user",
            value: JSON.stringify(user)
        },
    ]
}