QueryArray = []
Commands = ['clrscr'];
Connector = ['am', 'is', 'are']
/* QnA objects */
QnA = {
    Greetings: {
        q: [
            'hi', 'hello', 'How are you doing', 'How are you', 'Hey how is it going', 'What is up', 'What is new', 'fine', 'what is your name', 'Hey, i am', 'no', 'Thank you', 'why', 'what are you', 'who are you'
        ],
        a: [
            'hi', 'hey!', 'Great! How are you doing?', 'Fine, you', 'Going good', 'Nothing much.', 'Oh gosh, all kinds of stuff !', 'Good to hear', `I don't have a name`, 'nice to meet you.', 'ohhh...', 'Pleasure', 'mm.. I dont know', 'I am a chat bot', 'I m a machine...'
        ]
    }
}

// function to initiate send process
const initiateSend = () => {
    const msgField = document.getElementById('bot-input');
    // function to store chat and call functions to generate response.
    initiateBot(msgField.value);
    // resetting the input field after clicking send
    msgField.value = '';
}

const msgField = document.getElementById('bot-input');
msgField.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        initiateBot(msgField.value);
        // resetting the input field after clicking send
        msgField.value = '';
    }
});

// function to popoulate query message in chat body
const populateQuery = (index) => {
    const msgContainer = document.getElementById('chat-body');
    var query = `
    <div class="row">
       <div class="col-md-12 query">${QueryArray[index].chatContent}</div>
    </div>
    `;
    msgContainer.innerHTML += query;
}

// function to populate response message in chat body
const populateRes = (res) => {
    var query;
    const msgContainer = document.getElementById('chat-body');
    if (res != null) {
        query = `
        <div class="row justify-content-end">
        <div class="col-md-12 ans align-self-end">${res}</div>
        </div>
        `;
    } else {
        query = `
        <div class="row">
        <div class="col-md-12 ans align-self-end">Excuse me, could you repeat the question?</div>
        </div>
        `;
    }
    msgContainer.innerHTML += query;
}



// function to generate response
const generateResponse = (index) => {
    query = QueryArray[index].chatContent;
    var flag = false;
    var qType = null;
    var ansIndex = null;
    Object.keys(QnA).map((subObj) => {
        //console.log(QnA[subObj]['q']);
        Q_Array = QnA[subObj]['q'];
        for (var question of Q_Array) {
            // match and find percentage
            percentage = findMatchPercentage(question, query);
            if (percentage > 50) {
                flag = true;
                ansIndex = Q_Array.indexOf(question);
                qType = subObj;
                // if an exact match is found, return the response.
                if (percentage == 100) {
                    break;
                }
            }
        }
    })
    if (flag) {
        return QnA[qType]['a'][ansIndex];
    } else {
        return null;
    }
}

// function to match and find percentage 
// need to improve a lot
const findMatchPercentage = (question, query) => {
    question.trim().toLowerCase().replace(/[^\w\s\d]/gi, "").replace(/  +/g, ' ');
    var hit = 0;
    // exact match case
    if (question.toLowerCase() == query.toLowerCase()) {
        // return 100 pecentage
        return 100;
    } else {
        let questionSubParts = question.split(' ');
        let querySubParts = query.split(' ');

        questionSubParts = removeConnector(questionSubParts);
        querySubParts = removeConnector(querySubParts);

        for (qryPart of querySubParts) {
            for (qesPart of questionSubParts) {
                if (qryPart.toLowerCase() == qesPart.toLowerCase()) {
                    hit++;
                }
            }
        }
        // return the percentage
        return ((hit / question.length) * 100);
    }
}

// function to remove connectors if present
const removeConnector = (subPartArray) => {
        // to remove the connector words from both the query and the question .
        for (cWord of Connector) {
            for(qryPart of subPartArray){
                if(cWord.toLowerCase() == qryPart.toLowerCase()){
                    subPartArray.splice(subPartArray.indexOf(qryPart),1);
                }
            }
        }
        return subPartArray;
}


// function to store-chat
const initiateBot = (msg) => {
    var currentdate = new Date();
    var date = currentdate.getDate() + `:` + currentdate.getHours() + `-` + currentdate.getMinutes();
    messageObject = {
        'chatContent': msg.trim().toLowerCase().replace(/[^\w\s\d]/gi, "").replace(/  +/g, ' '),
        'timeStamp': date
    }
    // adding the new message to the question object
    QueryArray.push(messageObject);

    if (Commands.includes(messageObject.chatContent)) {
        const msgContainer = document.getElementById('chat-body');
        switch (messageObject.chatContent.toLowerCase()) {
            case 'clrscr':
                msgContainer.innerHTML = '';
                return null;
        }
    }
    // populate the query in chat box
    populateQuery(QueryArray.indexOf(messageObject));
    // get the appropriate response for the query
    var res = generateResponse(QueryArray.indexOf(messageObject));
    // populate the response in chat box
    populateRes(res);
}

// function to manipulate question and query
const mainpulateQuestionAndQuery = (qesPart, qryPart) => {

}