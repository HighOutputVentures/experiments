## Authors
* Daniel Aranas

## Goal Statements
* create a **lucidchart** style web app that lets us make a sequence diagram

## Abstract
As mentioned in the goal statements, we're going to be making an app that lets us create sequence diagrams in the HTML canvas.
We might not use React in future projects, but it was used during the experiment as compatibility
with it will be necessary for some projects.

## The Journey
This experiment did not end successfully. But I will be writing down what I have experienced,
perhaps someone in the future will have greater success.

Initially, I tried to do things using just **vanilla HTML5**. There were some delays, as I
was looking at **draw.io** (*aka diagrams.net*) instead of **lucidchart**.

However, what caused me to conclude the approach might not be ideal is the PDF showing
a sample sequence diagram had a line from a line to another line, and in my implementation
this just got too complicated. This CAN be solved, but it will take time and maybe more people.

Next, I looked into packages that might help. A lot were rejected as they lacked any "drag-n-drop"
functionality. For a few it was more complicated:

**draw2d**'s own documention suggested it would be difficult to customize, and why would
someone use our solution when it already exists as *diagrams.net*.

**mxGraph** might be promising, I recommend the next person tackling this problem check it out,
but with it no longer being updated, and the forks not looking too active at the time,
I hesitated to look further into it.

**GoJS** looked quite good. But while trying it out, I realized that the package is NOT free,
and ~9kUSD a year to use seems a rather steep price. I also had issues getting it to
find the div for the palette and ultimately gave up on that.

**bpmn.io** I had high hopes for initially. But I found their documentation less than great.
Getting it to work well with React was harder than I expected. For example using the
*modeler* with the state you have to be careful when you actually set it else you
end up with oddities like hot reload duplicating the diagram.

It was also lacking some basic things I needed like the ability to make ANY line dotted,
to connect lines to empty space (and other lines), text boxes... it seems highly customizable
but again I found the docs hard to follow and at this point it might be worth just making our own.

## Conclusion
This experiment ended up more complicated than expected. I also realized partway through I prefer
"regular" projects to experiments, so maybe had my will been stronger a solution might've
been found. I wish the next person/s to try and solve this the best of luck.
Perhaps little by little, we can advance a bit further with each turn. That's how a drill works.

## Resources (any official docs omitted for brevity)
Vanilla HTML5:
- https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
- https://www.cluemediator.com/draggable-rectangle-on-canvas-using-react
- https://codepen.io/teacherhogg/pen/QpeXrY
- https://gist.github.com/jwir3/d797037d2e1bf78a9b04838d73436197
- http://stackoverflow.com/a/36805543/281460

GoJS:
- https://gojs.net/latest/samples/flowchart.html
- https://codesandbox.io/s/quizzical-lake-szfyo?file=/src/App.js

bpmn.io:
- https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
- https://github.com/bpmn-io/webjar-bpmn-js/blob/master/examples/modeler/src/main/webapp/empty.bpmn

Things briefly looked into:
- draw2d.org
- jointjs
- d3js
- mermaid
- js-sequence-diagram
- yuml2svg
- mxGraph
