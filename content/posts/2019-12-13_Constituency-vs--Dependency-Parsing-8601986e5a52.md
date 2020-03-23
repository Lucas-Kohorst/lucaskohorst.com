+++ 
date = "2019-12-13"
title = "Constituency vs. Dependency Parsing"
slug = "constituency-dependency-parsing" 
tags = ['Language Technology', 'Parsing', 'NPM']
categories = []
+++

![](https://cdn-images-1.medium.com/max/800/1*hgsOy2taLHryX3kFFtRenA.png)

Sentence parsing can be helpful in understanding the meaning, structure,
and syntactical relationships in sentences. Two common types are
dependency and constituency parsing which is also known as syntactical
parsing. Dependency parsing is the process of defining the grammatical
structure of a sentence by listing each word as a node and displaying
links to its dependents. A constituency parsed tree displays the
syntactic structure of a sentence using context-free grammar. Unlike
dependency parsing which relies on dependency grammar. Both types of
parsing are important in computational linguistics but there is much
debate over which is better. Critics of constituency parsing say that it
displays extraneous information while supporters like to visualize the
entire sentence structure rather than just the grammatical dependencies.

I created a dependency and constituency sentence tree visualizer in
order to analyze the two parsing systems published as an NPM package,
[react-sentence-tree](https://npmjs.com/react-sentence-tree). This
project relied on using React as the web framework, Stanford CoreNLP as
the parsing server, and react-d3-tree to visualize the parsed sentences.
Using these technologies, I created an open-source Node.js package for
other developers to use and expand upon along with a demo web app. With
this package, I tested various sentences, such as sentence fragments,
non-projective and ambiguous sentences to compare and contrast
constituency and dependency parsing.

Constituency parsing is very helpful in visualizing the entire
syntactical structure of a sentence. These parse trees can be useful in
word processing systems for grammar checking. For example, it is very
hard to parse a grammatically incorrect sentence. This is because if a
sentence cannot be parsed then the program can make a reasonable
assumption that the sentence contains some grammatical errors. However
more often than not constituency parses are used as representations of
the sentence and play a role in information extraction. Such as,
determining the subject of a sentence.

The biggest problem that arises with constituency parsing is structural
ambiguity. This occurs when there are multiple grammatical
interpretations of a sentence. The sentence “I shot an elephant in my
pajamas” is a common sentence linguist use to demonstrate ambiguity.
There are multiple ways the sentence can be understood (albeit one
clearly ridiculous). Either the elephant was shot while the person was
standing in his pajamas, the obviously correct interpretation. Or the
elephant was shot inside of the person’s pajamas. In this example there
is a structural ambiguity around the word “shot”, if “shot” is parsed as
a verb by itself the sentence will convey the humorous meaning. When
parsed correctly the word “shot” should be a parsed as a verb nested in
a verb phrase with the corresponding noun phrase being “an elephant”.

This is an example of structural ambiguity since “shot” can be attached
to the sentence as a verb or contained as a verb within a verb phrase.
The other common type of ambiguity deals with coordination. When phrases
contain conjunction such as “and” or, “but” they can be subject to
coordination ambiguity. For example, the sentence “Everyone here are old
men and women”. This sentence can be understood as everyone here is an
old man or an old woman, but it can also be parsed as everyone here is
an old man or a woman.

Constituency parsing can be achieved with multiple algorithms the
[Cocke-Kasami-Younger (CKY)
algorithm](http://CYK%20algorithm%20-%20Wikipedia), a probabilistic
bottom-up approach is a popular approach along with the probabilistic
context-free grammars
([PCFGs](http://www.cs.columbia.edu/~mcollins/courses/nlp2011/notes/pcfgs.pdf))
algorithm.

My project relied on [Stanford’s
CoreNLP](https://stanfordnlp.github.io/) which uses a [shift-reducer
algorithm](https://en.wikipedia.org/wiki/Shift-reduce_parsing) for
syntactical parsing, primarily because it is more efficient than PCFG or
CKY. Shift-reducing is a stack-based approach to parsing using
context-free grammar. All tokens in the sentence are pushed onto the
stack, then the top two tokens are popped off and matched to grammar
rules and placed back onto the stack in their reduced form.

Constituency parsers have trouble with ambiguous sentences, so I decided
to test sentences such as “I shot the elephant in my pajamas” and “I
shot the elephant in pajamas”. There are two interpretations of these
sentences as described above. The constituency parser correctly parsed
both sentences as the non-humorous way. Other ambiguous sentences such
as “I saw a man on a hill with a telescope” are also parsed as expected.
In addition to ambiguity parsing errors can commonly occur from
non-projective sentences or sentences in which long-distance syntactical
errors occur.

One problem associated with constituency parsing is that in order to use
common algorithms like CKY, the sentence must be in [Chomsky Normal
Form](https://en.wikipedia.org/wiki/Chomsky_Normal_Form) (CNF). This is
a disadvantage because it is often difficult to convert free word order
languages, for example, many Slavic languages. This can be resolved by
using [Role and reference
grammar](https://en.wikipedia.org/wiki/Role_and_reference_grammar) (RRG)
rather than context-free grammar transformed into CNF. Role and
reference grammar’s main feature is that it utilizes lexical
decompensation. Lexical semantics are words, sub-words and units of
words. RRG breaks down the sentence into lexical parts and using an
analysis of clause structure in order to form a sentence hierarchy. Role
and reference grammar is less popular than constituency parsing but
provides the advantage of being able to easily parse free word order
languages.

Dependency parsing differs from syntactical parsing as it uses
dependency grammar and displays only the relationships between words
rather than the sentence structure and relationship. Dependency trees
are often more concise than constituency trees because they only display
grammar between a governor and is dependents. Similar to constituency
parsing dependency is helpful in word processing systems and grammar
checking.

Common algorithms used in dependency parsing are treebank searching
algorithms like
[Arc-eager](https://www.mitpressjournals.org/doi/full/10.1162/COLI_a_00185)
or [beam search](http://www.cl.cam.ac.uk/~sc609/pubs/cl11_early.pdf),
graph-based approaches such as edge based or by using a neural network
which is what [Stanford
CoreNLP](https://nlp.stanford.edu/software/nndep.shtml) utilizes and
what I used in
[react-sentence-tree](https://npmjs.com/react-sentence-tree).

Dependency parsing’s one key advantage over constituency is that it has
the ability to parse relatively free word order. This allows languages
such as Latin, which has no fixed order, to be parsed. Dependency
parsing also performs better when parsing non-projective and fragmented
sentences. Constituency parsing’s advantage over constituency parsing is
its ability to display the entire structure of a sentence rather than
simply the word associations.

When developing and testing my application I ran into a few limitations
and bugs. The first limitation is that currently the project only
supports parsing English, however I do have ideas on how to expand the
languages available in the future. An interesting aspect is that if
there are multiple interpretations of a sentence (i.e. if the sentence
is ambiguous) the parser only displays one of them and does not inform
the user that there are other interpretations. This can be seen with the
elephant example from above. The common interpretation that the man is
in his pajamas is the rendered tree. I would like to inform the user of
the number of possible parses and allow them to select which parse they
want to visualize. Another interesting bug in the program is that the
last letter inputted is not parsed or displayed on the tree. I have a
feeling that this is due to how state is handled in my application. This
bug does not affect how the sentence is parsed, since it is the last
letter in the sentence, but it could lead to confusion of the user.

Constituency and dependency parsing share many characteristics in how
and what they can parse. Many of the algorithms such as Shift-Reducer
and the use of Neural Nets are commonly used in both parsing techniques.
However, they differ in what they produce and how effective they are.
Dependency parsing displays only relationships between words and their
constitutes while constituency parsing displays the entire sentence
structure and relationships. Often dependency parsing is praised for
being concise yet informative, but constituency parsing is often easier
to read and understand. Working on this project I learned that while
constituency and dependency parsing have their differences and specific
use cases. They provide very similar results and the decision on which
to use is ultimately up to you and your preferences.

* * * * *

You can check out the react package here
[react-sentence-tree](https://npmjs.com/react-sentence-tree)

Github: [Lucas-Kohorst](https://github.com/Lucas-Kohorst)

Twitter: [@KohorstLucas](https://twitter.com/KohorstLucas)

Email: kohorstlucas@gmail.com

By [Lucas Kohorst](https://medium.com/@lucaskohorst) on [December 13,
2019](https://medium.com/p/8601986e5a52).

[Canonical
link](https://medium.com/@lucaskohorst/constituency-vs-dependency-parsing-8601986e5a52)

Exported from [Medium](https://medium.com) on March 5, 2020.
