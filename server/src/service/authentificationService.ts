let SpotifyWebApi = require("spotify-web-api-node");
import { spotifyDetails, scopes } from "../config/spotify.config";
import { TokenData } from "../types/types";

export class AuthenticationService {
  static spotifyApi = new SpotifyWebApi({
    clientId: spotifyDetails.clientId,
    clientSecret: spotifyDetails.clientSecret,
    redirectUri: spotifyDetails.redirectUri,
  });

  static getAuthorizationUrl() {
    return this.spotifyApi.createAuthorizeURL(scopes);
  }

  static async handleCallback(code: string): Promise<TokenData> {
    try {
      const tokens: TokenData = await this.retrieveTokens(code);
      this.setupTokenRefresh(tokens);
      return tokens;
    } catch (error) {
      console.error("Callback Handling Error:", error);
      throw error;
    }
  }

  private static async retrieveTokens(code: string) {
    const data = await this.spotifyApi.authorizationCodeGrant(code);
    const access_token: string = data.body["access_token"];
    const refresh_token = data.body["refresh_token"];
    const expires_in = data.body["expires_in"];

    this.spotifyApi.setAccessToken(access_token);
    this.spotifyApi.setRefreshToken(refresh_token);

    console.log("access_token:", access_token);
    console.log("refresh_token:", refresh_token);
    console.log(
      `Successfully retrieved access token. Expires in ${expires_in} s.`
    );

    return {
      access_token,
      refresh_token,
      expires_in,
    };
  }

  private static setupTokenRefresh(tokens: TokenData) {
    const { expires_in } = tokens;

    setInterval(async () => {
      try {
        const data = await this.spotifyApi.refreshAccessToken();
        const new_access_token: string = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", new_access_token);

        this.spotifyApi.setAccessToken(new_access_token);
      } catch (error) {
        console.error("Token Refresh Error:", error);
      }
    }, (expires_in / 2) * 1000);
  }
}
