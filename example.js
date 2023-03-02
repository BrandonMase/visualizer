let RESPONSE = {
  acct_bk: {
    type: 'sfg',
    entries: {
        title: 'none',
      source: [
        {
          type: 'char',
          int: 1
        }, 
        {
          type: 'char2222222222',
          sour: [
            {more: 'no'}
          ],
          int: 1
        }, 
    ]
    }
  }
}

pm.sendRequest("https://cdn.jsdelivr.net/gh/BrandonMase/visualizer@acc4d118cc46ce04158eb6ba4d1ad5581e057b8a/visualizer.js", (err, res) => {
   //convert the response to text and save it as an environment variable
   pm.collectionVariables.set("PMVisualizer", res.text());
 
   // eval will evaluate the JavaScript code and initialize the min.js
   eval(pm.collectionVariables.get("PMVisualizer"));
    
    //add the keys you want to display
    this.PMVisualizer.addKey('acct_bk.type')
    this.PMVisualizer.addKey('acct_bk.entries.source[0].type')
    this.PMVisualizer.addKey('acct_bk.entries.source[1].sour[0].more')
    this.PMVisualizer.addKey('acct_bk.entries.title')

    //set the visualizer with getContent
    // need to use pm.response.json() instead of response
    pm.visualizer.set(this.PMVisualizer.getContent(RESPONSE), RESPONSE)
})
