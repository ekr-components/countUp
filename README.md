# countUp

A component that will take the number portion of a string and animate it
counting up or down.

## How to use this component

Simply add `data-component="countup"` to the element that contains the text
that needs to be animated.

```html
<span data-component="countup">$105,304 tuition</span>
```

This will automatically parse out the digits from the string.

The component will listen for the event `count`. When this event is triggered,
it will start at the initial number (0 if it's counting up) and then loop
through all the intervals until it reaches the target number.

```js
jQuery('[data-component="countup"]).trigger('count');
```

This is mainly set up this way so that the counting can be triggered on
scrolling events.

### Counting Direction

By default, the number will count down if it's less than 10, and count up if
it's greater than 10.  You can manually change the direction that the counting
happens by adding the following attribute to the element `data-countup-direction`:

```html
<span data-component="countup"
	data-countup-direction="up">
	$105,304 tuition
</span>

```

Valid values for `data-countup-direction` are `up` and `down`

## How does this work?

Basically, it takes the number in the string, divides it by 100, then animates
through those 100 intervals. The default interval between animations is 20ms.

