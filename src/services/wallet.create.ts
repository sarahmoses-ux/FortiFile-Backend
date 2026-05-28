import { privy } from "../config/privy";

export const CreateWallet = async (email: string) => {
  try {
    const user = await privy.users().create({
      linked_accounts: [{ type: "email", address: email }],
    });

    const wallet = await privy.wallets().create({
      chain_type: "ethereum",
      owner: { user_id: user.id },
    });

    console.log(user, wallet);
    return { user, wallet}
  } catch (error) {
    console.error(error);
  }
};
