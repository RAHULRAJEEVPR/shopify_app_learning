// import {shopifyApi, LATEST_API_VERSION} from '@shopify/shopify-api';
// import shopify from "../shopify.js";

// const Shopify = shopifyApi({
//     // The next 4 values are typically read from environment variables for added security
//     apiKey: 'APIKeyFromPartnersDashboard',
//     apiSecretKey: 'APISecretFromPartnersDashboard',
//     scopes: ['read_products',"read_orders","write_products"],
//     hostName: 'ngrok-tunnel-address',
    
//   });
export async function createScriptTag(session, shopify) {
    console.log(session, "sessionnnnnnn");
    const client = new shopify.api.clients.Graphql({ session });
  
    const mutation = `
      mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
          scriptTag {
            id
            src
            displayScope
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
  
    const variables = {
      input: {
        src: "https://drive.google.com/uc?export=download&id=102roarI09V2BCyUVokFMeBGzcZelAfln",
        displayScope: "ONLINE_STORE"
      }
    };
  
    try {
      const response = await client.query({
        data: {
          query: mutation,
          variables: variables
        }
      });
  
      console.log('ScriptTag created successfully:', response.body.data.scriptTagCreate.scriptTag);
    } catch (error) {
      console.error('Error creating ScriptTag:', error);
    }
  }

  export async function checkScriptTag(session, shopify) {
    const client = new shopify.api.clients.Graphql({ session });
  
    const query = `
      query {
        scriptTags(first: 250) {
          edges {
            node {
              id
              src
              displayScope
            }
          }
        }
      }
    `;
  
    try {
      const response = await client.query({
        data: {
          query: query
        }
      });
  
      const scriptTags = response.body.data.scriptTags.edges;
      const targetSrc = "https://drive.google.com/uc?export=download&id=102roarI09V2BCyUVokFMeBGzcZelAfln";
  
      const foundScriptTag = scriptTags.find(edge => edge.node.src === targetSrc);
  
      if (foundScriptTag) {
        console.log('Script tag found:', foundScriptTag.node);
        return true;
      } else {
        console.log('Script tag not found');
        return false;
      }
  
    } catch (error) {
      console.error('Error checking ScriptTag:', error);
      return false;
    }
  }