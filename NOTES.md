# UBCLaunchPadApplication
Developer Pre-Task for UBC Launch Pad Application (Web)

EASY-TASK
The hardest part was definitely parsing the code and figuring out what it does. After that, the biggest challenge was trying to implement
the timer function. An extra line was added to the clickHandler function such that every time a note was pressed, the note was added to a 
list of notes to be echoed, and the 2.5 second timer would be reset. A function also checks every milisecond to see if the timer has reached 0,
and would echo back the notes and reset the played function if it did. 

CHALLENGE-TASK
After completing the easy task, the challenge task took much less since time since I was already familiar with the code. The game starts off
by generating a random note, which uses a random number generator from 0-3, where every number corresponds to one of the 4 notes. Another 
function plays the list of notes generated. 

The updated clickHandler calls the Simon() function, giving it the key that was pressed by the 
user. There are two lists, the playlist (list of notes generated), and the playerlist(list of notes played by user). The playerlist resets
into an empty array every time the user plays the whole sequence correctly. Every time the user presses a key, the Simon function compares
the played note to the corresponding note in playlist. It also checks if the sequence is finished by the user by comparing array lengths, and
generates a new note and plays the updated pattern.

If a note played does not match, the Simon function will reset game, starting with a new playlist. The score increments every time the sequence
is played correctly by the user, and is shown on the web page.

The PlayNotes function that plays the sequence has a setTimeout set to 2 seconds. If it were not set, the sequence would play immediately after
the player plays the last note in the sequence, causing the notes to overlap. Currently there is a strange problem where the first note does not
make a sound whenever you open the page on Chrome, but all the other notes work. There isn't an issue on the other browsers I've tried (Safari 
and Edge).
