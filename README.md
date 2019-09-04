# IdleGuild
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81de043ced7c48b3a45956a384259378)](https://www.codacy.com/app/PMBakerJohnson/idle-guild?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=PMBakerJohnson/idle-guild&amp;utm_campaign=Badge_Grade)
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

The basic conceit that I'm going for is that you, the player character, are an aspiring manager of an adventurer's guild in a D&D inspired fantasy setting. You'll have facilities created to support various adventurers and other support staff that you'll hire, and can expand as you see fit. Now with 80%+ code coverage!

## Things I've stopped doing

I was trying to use interfaces and abstract classes to create a greater sense of abstraction and dependency injection but I wasn't having any luck with that, so I'm putting that off for now. I'll try to use them for things I do going forward. Ugh. For additional clarity, I was just having issues doing testing on abstract features and all sorts of other hellish nonsense.

## Current features

You begin with a small initial sum of money, and then can purchase buildings to earn (and increase) a passive income. Also some tabs! And now you can save the game!

## Current effort

Separate out the save features from the various data services so I can stop repeating myself there.

## Up next, in approximate order of importance

- Add employees with associated professions that require buildings that produce gold on their own, and set buildings back to not producing anything.

## Roadmap ???
0.1: Proof of concept
-    Just enough to convince me I can do this. Has a resource, an idle loop, a way to persist data, and purchaseable objects that increase the amount of any given resource you produce.

0.2: People
-    Add hireable employees that draw a wage and produce finances;
