Bingo Challenge

-----------------------------

GitHub: https://github.com/timged/bingochallenge

Demo: https://64b53bc899a8311e1b074958--ubiquitous-mandazi-340e7b.netlify.app/

To build the application:

npm install

npm run build

Note: CORS errors are likely if you don't run the application from a webserver. 

To run the tests:

npm test

-----------------------------

Set Up
Welcome to the Bingo Challenge. As the captain of a submarine stopped by a giant squid, you'll need to win a bingo game to continue your
journey.

What Are We Looking For?
- Problem-solving ability
- Clean and unit tested code
- Code in a GitHub repository

Bingo Rules
- Bingo is played on a set of boards, each consisting of a 5x5 grid of numbers.
- Numbers are chosen at random and marked on all boards on which they appear.
- If all numbers in any row or column of a board are marked, that board wins.
- Diagonals don't count.
- Data sets should be called from external txt files

Part 1 - Determining a Winning Bingo Game
Given an input of called numbers in order followed by a bingo card:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11 0
8 2 23 4 24
21 9 14 16 7
6 10 3 18 5
1 12 20 15 19

Your task is to write a program that determines whether this card will ever get Bingo.

Part 2 - Determining a Winning Bingo Game
Knowing all cards and the order of numbers being called in advance gives you an advantage. Given the same input as Part 1, but with
additional boards listed:

7,,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11 0
8 2 23 4 24
21 9 14 16 7
6 10 3 18 5
1 12 20 15 19

3 15 0 2 22
9 18 13 17 5
19 8 7 25 23
20 11 10 24 4
14 21 16 12 6

14 21 17 24 4
10 16 15 9 19
18 8 23 26 20
22 11 13 6 5
 2 0 12 3 7

 Can you write a program that tells you which board to pick to guarantee a win against the giant squid?

