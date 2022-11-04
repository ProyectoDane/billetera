import {getUser} from "../../dataAccess/User";
import getMoney from "./loadMoneyToContext";

export async function loadUserToContext(id, context) {
    console.log(`load user to context  ${id}`);
    const user = await getUser(id);
    context.setCurrentUser(user);
    return user;
}

export async function changeCurrentUserAndReload(id, context) {
    console.log(`Switching to user ${id}`);
    let user = await loadUserToContext(id, context);
    await getMoney(context);
    return user;
}