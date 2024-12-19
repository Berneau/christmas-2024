// Helper function for pausing code
const wait = (msec) => new Promise((resolve, _) => { setTimeout(resolve, msec) });

const typeSpeedDelay = 75;

// Get optional name from url params
const urlParams = new URLSearchParams(window.location.search);
const recipient = urlParams.get('name');

const targetElement = document.getElementById('targetElement');

const lines = [
  {
    indentation: 0,
    chunks: [
      { text: 'function ', type: 'keyword' },
      { text: 'sendeWeihnachtsgrüße ', type: 'method-name' },
      { text: '(', type: 'other' },
      { text: 'empfänger', type: 'variable' },
      { text: ') ', type: 'other' },
      { text: '{', type: 'other' }
    ]
  },
  {
    indentation: 1,
    chunks: [
      { text: 'let ', type: 'keyword' },
      { text: 'text ', type: 'variable' },
      { text: '= ', type: 'other' },
      { text: '"Frohe Weihnachten"', type: 'string' },
      { text: ';', type: 'other' }
    ]
  },
  {
    indentation: 1,
    chunks: [
      { text: 'if ', type: 'keyword' },
      { text: '(', type: 'other' },
      { text: 'empfänger', type: 'variable' },
      { text: ') ', type: 'other' },
      { text: '{', type: 'other' },
    ]
  },
  {
    indentation: 2,
    chunks: [
      { text: 'text ', type: 'variable' },
      { text: '+= ', type: 'other' },
      { text: 'empfänger', type: 'variable' },
      { text: ';', type: 'other' },
      { isRecipient: true, type: 'comment' }
    ]
  },
  {
    indentation: 1,
    chunks: [
      { text: '}', type: 'other' }
    ]
  },
  {
    indentation: 1,
    chunks: [
      { text: 'text ', type: 'variable' },
      { text: '+= ', type: 'other' },
      { text: '"wünschen: Berni, Dani & Lina"', type: 'string' },
      { text: ';', type: 'other' }
    ]
  },
  {
    indentation: 1,
    chunks: [
      { text: 'console', type: 'keyword' },
      { text: '.', type: 'other' },
      { text: 'log', type: 'method-name' },
      { text: '(', type: 'other' },
      { text: 'text', type: 'variable' },
      { text: ');', type: 'other' },
    ]
  },
  {
    indentation: 0,
    chunks: [
      { text: '}', type: 'other' }
    ]
  }
];

const typeChunk = async ({ text, isRecipient }, spanElement) => {
  if (isRecipient) {
    if (!recipient) return;
    text = ` // ${recipient}`;
  }

  for (let i = 0; i < text.length; i++) {
    spanElement.innerHTML += text[i];
    await wait(typeSpeedDelay);
  }
}

const typeLine = async ({ indentation, chunks }) => {
  const lineElement = document.createElement('p');
  lineElement.classList.add(`indent-${indentation}`);
  targetElement.appendChild(lineElement);

  for (let i = 0; i < chunks.length; i++) {
    const spanElement = document.createElement('span');
    spanElement.classList.add(chunks[i].type);
    lineElement.appendChild(spanElement);
    await typeChunk(chunks[i], spanElement);
  }
}

const type = async () => {
  console.log(`Frohe Weihnachten${recipient ? ` ${recipient}` : ''}! Wünschen Berni, Dani & Lina :)`);

  for (let i = 0; i < lines.length; i++) {
    await typeLine(lines[i]);
  }
}

type();
