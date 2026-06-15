import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gmxmutqzcnyjwdqjuoyb.supabase.co";
const supabaseKey = "sb_publishable_NLNOPGOF_vVrfy24o3L7mQ_sfc2NNka";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);