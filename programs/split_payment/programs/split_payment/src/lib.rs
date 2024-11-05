use anchor_lang::prelude::*;

declare_id!("3ZHeYG417qB1CwoEhagdVjp12aCMf13VhwLX5hPTgJAr");

#[program]
pub mod split_payment {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
