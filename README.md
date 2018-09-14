# Backpack

## A life management application

The goal of this application is to build a task management application that will work for both the average person needing to manage their day-to-day life and teams needing to manage their tasks and missions.

I started building this application about a year ago in Ruby and Ember. Then translated it over to NodeJS and Ember. Then went from Ember to Angular. Then went from Angular to Backbone. And now the current stack consists of:

I've kept this project running as a sort of testing ground for when I've wanted to learn some new technology. It's kind of like the basic to-do applicaton that many people build to display how some new-fangled MVC framework works. I never liked those because real world developers are not building to-do apps.

We're building apps in the real world for real consumers. These apps have to be both stable and scalable. The apps we build are not one JavaScript file with about 50 lines of code. They're more like 100+ files with 20,000+ lines of code.

So I wanted to take the basic premise of the basic to-do application and build out some extra real-world features such as:

My other goal for this application is for it become a sort of snapshot of what the current state of full-stack JavaScript application development looks like. It should use the current "go-to" tools, frameworks, libraries, architectures, and methodologies that have proven themselves as "here for the long haul" technologies that every developer should have in their tool kit and integrated into their stack.

## TODO
-   Server-side rendering
-   Authentication & OAuth
-   Build systems
-   Testing
-   Server-side error logging
-   An analytics layer
-   File uploading
-   An application dashboard layer
-   Phone Authentication (NO MORE PASSWORDS!)

## Human API

========

This is a scratchpad for created a JSON document that could reflect the current
state of a person's life. The idea came to me when I was thinking about how in a
uni-directional data flow application there is one state tree/object that has the
current state of the application. Every human being as a current state tree/object
of their life but it is spread across multiple devices, services, etc. This is
a thought experiment of what a JSON object would look like if it displayed the
current state of human being's life.
