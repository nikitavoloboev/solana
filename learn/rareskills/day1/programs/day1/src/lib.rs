use anchor_lang::prelude::*;

declare_id!("82hqW8QmK4ws2NWewNHjNX8BZajvDt5rd4i6BMhbttj4");

#[program]
pub mod day1 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
