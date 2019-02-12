# IdleGuild

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

The basic conceit that I'm going for is that you, the player character, are an aspiring manager of an adventurer's guild in a D&D inspired fantasy setting. You'll have facilities created to support various adventurer's and other support staff that you'll hire, and can expand as you see fit.

## Current features

Right now, you can click a button and earn gold that will persist as long as you have that tab open. Plus you can toggle between two different tabs. Impressive, I know. Technically there is an idle loop ticking in the background but the default is that nothing gets generated per tick yet.

## Current effort

I'm adding in features to buy your own buildings, which will for the moment, generate gold on their own. Eventually they won't produce anything, just give you the ability to hire employees.

## Up next, in approximate order of importance

- Persist player progress between sessions. Needs to save using HTML5 local storage. Plus maybe I can export a string for the user, if they want it?
- Add employees with associated professions that require buildings that produce gold on their own, and set buildings back to not producing anything.
- Remove clickable thing. I don't think that's going to have a place in the future.

## Roadmap ???
	0.1: Proof of concept
		- Just enough to convince me I can do this. Has a resource, an idle loop, a way to persist data, and purchaseable objects that increase the amount of any given resource you produce.
	0.2: People
		- Add hireable employees that draw a wage and produce finances;
