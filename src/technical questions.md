1. How long did you spend on the coding test? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

    Took 3 hrs to complete the test. 

    If I had more time I would have made the application responsive and added a loader while the data is being loaded. Also made the application more accessibility compliant and would have added more test cases as well.

2.  What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
    I have used react hooks instead of class based components. It has helped me to bring down the number of lines and also eliminates the use of different life cycle methods.

    useEffect(() => {
        if (props.cities !== undefined) {
        setCities(props.cities);
        }
    }, [props.cities]);

3. How would you track down a performance issue in production? Have you ever had to do this?
    I have encountered a situation where the page was taking more than a minute to load which had a large form with several fields in production. Happened when the form has got lots o fields with prepolulated lists. 

    Analysed the rendering pattern with a profiler and checked the re-renderings happening within each component. And I have used shouldComponentUpdate to make sure unnecessary renderings are not happeing. Also wrapped the component using React.memo to memoize the component.

4. How would you improve the API that you just used?

    The current API is not paginated and works only with a search parameter. It would have been nice if the API is paginated and works even without a filter associated with it.

5. Please describe yourself using JSON.

    {
    "name": "Anjana",
    "lastname": "Jose",
    "country": "Canada",
    "livesin": "Mississauga",
    "description": "passionate programmer with a total of 5 years of experience and more than 3 years of hands-on experience in efficiently coding websites and applications using React/Redux, HTML, CSS, and JavaScript",
    "skills": [
        "React",
        "React hooks",
        "Redux",
        "Javascript",
        "HTML",
        "CSS",
        "Accessibility",
        "GIT",
        "Agile Methodology",
        ]
    }