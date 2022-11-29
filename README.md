# myMusic Full Stack Web App
Rate your music who? this year you'll be wanting to go to myMusic to review your favorite albums. This is a basic CRUD app that allows users to create a personal profile, review albums, read other user's reviews, and look at other user's profiles. There is a small amount of on site interaction thru comments. Users can also reach out to eachother thru emails that they post on their profile.

## Technologies used
HTML, CSS, JavaScript, Express, EJS, and MongoDB. Bootstrap was used for styling. Dependencies are bcrypt, connect-mongodb-session, ejs, express, express-session, method-override, mongodb, and mongoose. 
You may see assert, connect-flash, and multer in package.json, but those dependencies are not being used in the app as it is today.

## Heroku Link
https://mysterious-ridge-06952.herokuapp.com/

## User Stories
#### LANDING
- As a user, I want it to be clear how i can login or register for a new account
#### REGISTER
- As a user, I want it to be clear how I can sign up for a new account. If there is an issue, I want alerts telling me what I need to change.
- As a user, I want to be redirected to a login page directly after registering.
#### LOGIN
- As a user, I want it to be obvious where my info should go. If there is an issue, I want alerts telling me what I need to change.
- As a user, I want to be redirected to a home page once I log in.
#### NAV BAR
- As a user, once I am in the site I want a nav bar on every page that has links to every page I might want to go to.
- As a user, I want to be able to engage a search function from any page that I am on, so that I can quickly find articles or authors that I am interested in.
- As a user, I want to be able to log out of my account from any page I am on, so that I can quickly end my session.
#### PROFILE
- As a user, I want to have a profile page where I can post my picture, write about myself and my music taste, and specify genres I’m interested in, so that other users can decide whether or not to read my reviews and interact with me.
- As a user, I want to have the option to edit my profile, so that if my interests change, my profile is kept up to date.
#### HOME 
- As a user, I want a homepage that is populated with the most recent reviews, so that I can keep up with the newest content.
- As a user, I want appealing cards that I can click on with basic info about the album being reviewed so that I can determine whether or not it might be of interest to me.
#### ARTICLES
- As a user, I want to know who wrote the review, basic info about the album, a video or audio link from the album, the rating, and the review itself.
- As a user, I want to be able to comment on a review so I can let the reviewer know what I think, and so I can connect with other users that have similar interests to me.
- As a user, I want the ability to write my own reviews, so I can put my content out there and relate with people over it.
- As an author, I want to be able to go back and edit articles I’ve posted, so that I can fix typos, or incorporate new info I’ve learned since writing the review.
- As an author, I want to be able to delete an old review, so that I can remove content I no longer stand by.
- As an author, I want it to be easy to write a new post, so that I can focus on the actual reviewing as opposed to formatting or anything else.
#### AUTHORS 
- As a user, I want to have a page where I can look thru all of the authors on the site, so that I can find specific authors whose taste I trust and I can read all of their reviews. 
- As a user, I want to be able to read a blurb about the authors I am reading and see what other genres they like.
- As an author, I want to have my profile page readily available to readers, so that if they like my content they can peruse everything else I’ve written
- As an author, I want to be able to edit my page, but I don’t want anyone else to have that capability.


## Bugs
- Users can't review albums with the same name
- Textareas don't auto-populate with previous text
- Logout button glitches on home page immediately after login 

## What I would add with more time
- Comments would link to user profiles
    - Ability to comment in threads
- Ability to upload images instead of just links 
- Password must include one special character
- Ability to like posts
- Ability to follow certain authors
    - Your home page feed would be their posts, and the nav bar would have a link to a page that is all posts sorted by most recent
- More specific search & fuzzy search

## What I learned
- Youtube tutorials are incredibly helpful forms of documentation
- Don't try to troubleshoot on your own-- LOOK UP ANSWERS
- Bcrypt encryption
- How middleware actually works
- Bootstrap is a great tool.
- If something seems weird with the database, go look thru the database. I learned that MongoDB adds unique indexes to specific fields for reasons I don't quite understand... but now I now to go look for and delete them.