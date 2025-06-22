import axios from 'axios';

async function getConfigs() {
  const onlyPermissionless = true
  try {
    const response = await axios.get('https://amm-v2.meteora.ag/pool-configs');
    if (onlyPermissionless) {
    const permissionlessConfigs = []
        for (const config of response.data) {
        if (config.pool_creator_authority === "11111111111111111111111111111111") {
            permissionlessConfigs.push(config)
        }
      }
      console.log(JSON.stringify(permissionlessConfigs, null, 2));
    } else {
        console.log(JSON.stringify(response.data, null, 2));
    }
  } catch (error) {
    console.error('Error fetching configs:', error);
  }
}

getConfigs();
