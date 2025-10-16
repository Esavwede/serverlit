import SuperTokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import EmailPassword from "supertokens-node/recipe/emailpassword"
import Dashboard from "supertokens-node/recipe/dashboard"

import type { TypeInput } from "supertokens-node/types"

export default function initializeSuperTokens() {
  const appInfo = {
    appName: process.env.APP_NAME || "MyApp",
    apiDomain: process.env.API_DOMAIN || "http://localhost:5000",
    websiteDomain: process.env.WEBSITE_DOMAIN || "http://localhost:5000",
    apiBasePath: "/api/v1",
  }

  SuperTokens.init({
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [EmailPassword.init(), Session.init(), Dashboard.init()],
  } as TypeInput)
}
