# Flower catalogue
A flower catalogue SPA where users can login & register, create, edit & delete entries. They also have a profile page with their own catalogue of what they've created so far

## Purpose
Practice things learned in SoftUni JS Apps course & learn how to use a BaaS like Firebase

## Pages
- **Main page** - a landing page with a brief introduction to the website/project, a navigation bar with a view for signed-in users and another for guests, and a footer with basic contact information. Background: video, can be paused using button on the bottom left.
- **Login page** - a page where anyone can log into their existing account. If they don't have one, they can be redirected to the registration page. On incorrect input, error notifications appear on the top right.
- **Register page** - a page where anyone can sign up if they don't already have an account. There are practically no requirements for emails and passwords as this is purely a demo app. **DO NOT SIGN UP WITH REAL DATA.** Use only made-up email and pass, no validation.
- **Profile page** - a profile page unique to every user - displays name and email, and a personalised feed with all entries they've created on the website. They also have the option to create an entry.
- **Create entry page** - a page designed to create a new entry to the database - optional only for registered users.
- **Catalogue page** - a page with all entries in the database regardless of who created them. Upon clicking ***Details*** button, the user is redirected to the Detals page on the respective entry.
- **Details page** - a page with the details of the specific entry - name, what it's made of, other parameters, including a dropdown menu of the size which changes the price depending on what's chosen. If the user is the creator of the entry, buttons for ***Edit*** and ***Delete*** will show. Delete option will ask for confirmation before actually deleting the entry.
- **Edit page** - a page autofilled with the entry's current details. Will send an update to the database upon submitting, and redirects to the profile page.

## ToDo list
- [x] notifications
- [x] error handling
- [ ] testing
- [ ] pagination (maybe, will have to rewrite http requests)

will add a link when deployed
