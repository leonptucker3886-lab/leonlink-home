# Device-check steps: Card A and Card F

## Card A: nav bar and Ollie helper
1. Open /kids/pet/ on a phone with a pet already adopted.
2. Count the buttons in the bottom pet nav. v3.js navBar() builds 6: Home, Shop, Homes, Games, Book, Who.
3. Check that the site's own nav does not also show inside kids/pet.
4. Tap the owl in the header to start the helper. Tap next through all 6 steps.
5. Check each pointer lands on: pet, apple, meters, Shop, Play, Stickers.
**Pass:** 6 pet nav buttons and every step points at the button its words describe.
**Fail:** count is not 6, or any step points at the wrong button.

## Card F: Mute and pat sound
1. Sound on. Tap the pet's head once; you should hear the pat sound.
2. Turn Mute on.
3. Tap the head again. No sound.
4. Still muted, tap Pat. No sound.
5. Turn Mute off, tap Pat once. Sound plays exactly once.
**Pass:** no sound in steps 3-4, exactly one sound in step 5.
**Fail:** any sound while muted, or a doubled sound.
