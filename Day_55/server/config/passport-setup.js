import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from 'dotenv'

dotenv.config()


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.Id });        
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            googleId: profile.Id,
            email: profile.emails[0].value,
          });
        }
        console.log(user)
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
