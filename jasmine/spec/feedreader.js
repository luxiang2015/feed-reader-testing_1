/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is the second test - it tests to make sure that
           each feed in the allFeeds object has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined', function() {
            allFeeds.forEach(function(entry) {
                expect(entry.url).toBeDefined();
                expect(entry.url.length).not.toBe(0);
            });
        });


        /* This is the third test - it test to make sure that
         * each feed in the allFeeds object has a name defined
         * and that the name is not empty.
         */
        it('has a name defined', function() {
            allFeeds.forEach(function(entry) {
                expect(entry.name).toBeDefined();
                expect(entry.name.length).not.toBe(0);
            });
        });
    });

    /* This is the second test suite. This suite is all about
     * the menu.
     */
    describe('The menu', function() {
        /* This is the first test in the 'The menu' test suit.
         * It test to make sure that the menu element is hidden
         * by default.
         */
        it('element is hidden by default', function() {
            var menu = $('body').hasClass('menu-hidden');
            expect(menu).toBe(true);
        });

        /* This is the second test in the 'The menu' test suit.
         * It test to make sure that the menu changes
         * visibility when the menu icon is clicked.
         */
        it('element changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* This is the third test suite. This suite is all about
     * the initial entries.
     */
    describe('Initial Entries', function() {
        /* This test is to ensure that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('feed container has at least 1 entry', function() {
            expect($('.feed.entry')).toBeDefined();
            expect($('.feed').length).toBeGreaterThan(0);
        });
    });

    /* This is the forth test suite. This suite is all about
     * the new feed selection.
     */
    describe('New Feed Selection', function() {
        /* This test is to ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = $('.feed').html();
                loadFeed(2, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('changes content', function() {
            expect(firstFeed).toBeDefined();
            expect(secondFeed).toBeDefined();
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
});
