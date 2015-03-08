# around-events for RevealJS

## Overview

This plugin allows one to define `before`- and `after`-event set for each slide. Events are fired, as they go, before the slide is shown and right before the next slide is being shown.

## Usage

Usage is split into two steps.

### 1. Defining events code

Use `Reveal.addSlideHandler(handlerName, handlerRoutine)` to define a handler with the name `handlerName` and the code `handlerRoutine`.

You should define events before using them. Otherwise, they will simply not be fired.

### 2. Defining events for slides

Use the `data-before="event names list"` and/or `data-after="event names list"` attributes for the `section` tag, defining `before`- and `after`-events for the slide.

## Example

We can now create some **INTERACTIVE** presentation, asking user for his name.

Let us have these two slides:

    <section data-after="saveName">
        <h2>Enter your name</h2>
        <input name="userName" />
    </section>

    <section data-before="showName">
        <h2>Hello, <span id="name">user</span>!</h2>
    </section>

And defined these two handlers:

    Reveal.addSlideHandler('saveName', function(slide) {
        window.userName = slide.querySelector('[name=userName]').value;
    });

    Reveal.addSlideHandler('showName', function(slide) {
        slide.querySelector('#name').innerHTML = window.userName || 'user';
    });