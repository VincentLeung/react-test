import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate, Trans } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Header, Item, List, Message, Step } from 'semantic-ui-react';
import { Trigram, Hexagram, trigramName, hexagramName } from 'components';

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { choiceCount: 5 };
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    getRandomQuestion() {
        let isTrigram = this.getRandomInt(2);
        let gramDec = isTrigram ? this.getRandomInt(8) : this.getRandomInt(64);
        this.state.question = { gramDec, isTrigram };
    }
    generateQuestion() {
        this.getRandomQuestion();
        let gramDec = this.state.question.gramDec;
        return this.state.question.isTrigram ? <Trigram data={ {gramDec} } /> : <Hexagram data={ {gramDec} } />;
    }

    getChoices() {
        let choices = [];
        choices.push(this.state.question.gramDec);
        let max = this.state.question.isTrigram ? 8 : 64;
        while (choices.length < this.state.choiceCount) {
            let choice = this.getRandomInt(max);
            var duplicated = false;
            for (var i = 0; i < choices.length; i++) {
                if (choices[i] == choice) {
                    duplicated = true;
                }
            }
            if (!duplicated) {
                choices.push(choice);
            }
        }
        return choices;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    generateChoices(t) {
        let ret = [];
        let choices = this.getChoices();
        choices = this.shuffle(choices);
        for (var i = 0; i < choices.length; i++) {
            let gramDec = choices[i];
            let choiceText = this.state.question.isTrigram ? trigramName(t, gramDec) : hexagramName(t, gramDec);
            ret.push(<Button>{choiceText}</Button>);
        }
        return ret;
    }

    render() {
        const { t, i18n, user } = this.props;
        return (
          <Container>
            <Message color='olive'>
            {t('hexagram.page2')}
            </Message>
            <Container>
                { this.generateQuestion()}
            </Container>
            <Container>
                { this.generateChoices(t) }
            </Container>
          </Container>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state.data;
    const { user } = authentication;
    return {
        user
    };
}

const connectedPage2 = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Page2);
export { connectedPage2 as Page2 };
