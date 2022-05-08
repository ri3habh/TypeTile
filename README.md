# TypeTile

**Third Place Winner at UWaterloo Computer Science Club's Project Program Competition.** 

[Devpost Link](https://devpost.com/software/typetile)

[View it live here!](http://type-tile.herokuapp.com/)

## Developers
- Rishabh
- Ighoise
- Jacob
- Alston

## Inspiration

We wanted to combine an inspiration from piano tiles with an app that would help people improve their typing skills, and voila! We made TypeTile.

## What it Does

A piano tiles inspired game to help users practice their typing skills! Users can create accounts, play 4 different game modes, check all-time leaderboards, and track their typing improvement.

Four game modes (normal, normal poison, random, random poison):
- Normal: Random sentences are generated which you type out
- Random: Generated letters are completely random
- Poison: Some letters are red, and if you click those you lose points

Users:
- Users can create accounts and login/logout
- Users can access their profile page, which tracks all of their scores and graphs them, giving them a visual indication of their improvement
- Users can see leaderboards for all four game modes, each entry links to other player's profile pages, so you can check out other users who may be better (or worse) at the game than you

Misc:
- A settings page where you can set the initial speed and font of the letters that you want (you have 5 choices)
- A nice looking home page if I do say so myself (courtesy of Alston)

## How we built it

To build this project, we first started out by setting up express with the most important pages and very basic styling using bootstrap. We first focused on implementing the random game mode, since it'd be easiest to start with. This was done with a javascript utilizing DOM manipulation on the different game pages. After that mode was done, we implemented the normal mode, then the poison versions for both. Next, we set up user accounts using passport and mongodb. We created a schema for the user, and made sure that they could log in, log out, and create accounts. Next, we implemented the leaderboards, which involved creating a leaderboard schema, being a name and list of a user and their score whenever they made one. One the leaderboard page, we show the top ten highest scores for each game mode. We then implemented the profile page using chart.js, by keeping track of when each score was achieved, and plotting the score on the y axis and the date on the x axis. This allows the user to see their change in score over time in the different game modes. The last implementation was the settings page, which stores the settings in session, allowing the game script to access it.

## Challenges we ran into

The two most significant challenges were deciding how to increase the speed of the tiles and laying out the keyboard and making sure the falling keys were properly aligned. To increase tile speed, we could either increase the distance each tile moved on each screen update, or make the screen just update more often. The second option was more difficult to implement, may result in performance issues at very high speeds. Thus, we went with the second option. The layout of the keyboard was a challenge due to there being a lot of keys to lay out properly. We used the bootstrap grid to group the keys in four nice rows, then offset the rows according to how a keyboard would look in real life.

## Accomplishments that we're proud of

We're most proud of implementing the different game modes, along with the leaderboards and profile page. These implementations made it feel much more like a game that pushed you to improve in order to improve your own score progression and make it to the top of the leaderboards.

## What we learned

We learned a lot more about DOM manipulation, since making the game modes required a fair but of it. We got more practice with bootstrap navbars, cards, and the grid system. We learned about implementing authentication with express session and passport, and session to make data persist for the settings page.

## What's next for TypeTile

Some things we'd like to implement in the future include a possible rhythm mode (ex. users have to hit the correct keys on a beat, or to music), giving each user the option to upload profile pictures, being able to create/log in with different accounts (ex. your google, twitter, discord account), and having different levels of authorization.

## Built with
- Node.js
- Express.js
- MongoDB
- Passport
- Bootstrap
- Chart.js

