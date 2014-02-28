agent-shooter
=============

Take screenshots of a website using different user-agent

    Usage: shoot [options] url output
    
    Options:
    
    -a  android
    -c  chrome
    -e  internet-explorer
    -f  firefox
    -i  iphone
    -p  ipad
    -r  iphone-retina
    -s  safari
    -t  android-tablet

    Example 1: shoot csf http://google.com ./shots # save chrome, safari, firefox screenshots in the ./shots folder
    Example 2: shoot http://google.com             # save all user-agents in ./screenshots

hint: phantomjs is probably your safest bet

bonus: use window dimensions of the different devices (phone|tablet|pc)
