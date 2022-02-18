# ToDo

- Refactor data fetching functions
- Adjust styles in accordance with a markup
- Refactor cards using MUI cards (Typography)
- Implement load on scroll (for news list) with intersection observer api
- Check for area-labels
- Authontification with Firebase and next/auth

# Questions left

1) Since I chose to have added a toggle between normal list and carousel, am I right that "normal list" is a vertical one? Then does toggle functionality imply that either a horizontal or vertical list is supposed to be shown?
2) NextJs Image component is to optimize performance, thus is preferable to use. However, I see that more than 50 image domains are used. That is rather inconvinient, since all of them must be added to nextJs config. So what is the expected development behaviour for images here?
3) I have implemented algolia search, but see that only a full matched title can be found. So if I search for "depression" the results are coming, while they are not when only 'depress' in typed. Any advice, how (if necessary) can a half match search be implemented?
