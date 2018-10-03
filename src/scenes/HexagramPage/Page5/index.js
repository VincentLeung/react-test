import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Icon, Label, Message, Segment, ButtonGroup } from 'semantic-ui-react';
import { Trigram, Hexagram, trigramName, hexagramName } from 'components';
import { shuffle, getRandomInt } from 'helpers';

class Page5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { choiceCount:5, correct:0, incorrect:0 };
        this.state.question = this.getNextQuestion();
    }

    getAnswer(isTrigram, gramDec) {
        return (isTrigram) ? 7 - gramDec : gramDec ^ 63;
    }

    getNextQuestion() {
        let question = this.getRandomQuestion();
        while (question == this.state.question) {
            question = this.getRandomQuestion();
        }
        question.choices = this.getChoices(question);
        return question;
    }

    getRandomQuestion() {
        let isTrigram = getRandomInt(2);
        let gramDec = isTrigram ? getRandomInt(8) : getRandomInt(64);
        let answer = this.getAnswer(isTrigram, gramDec);
        return { gramDec, isTrigram, answer };
    }

    getChoices(question) {
        let choices = [];
        choices.push(question.answer);
        let max = question.isTrigram ? 8 : 64;
        while (choices.length < this.state.choiceCount) {
            let choice = getRandomInt(max);
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
        return shuffle(choices);
    }

    handleNextClick(answer){
        this.setState({ answered: false });
        this.setState({ question: this.getNextQuestion() });
    }

    handleAnswerClick(answer){
        if (!this.state.answered) {
            this.setState({ answered: true });
            if (answer == this.state.question.answer) {
                this.setState({correct: this.state.correct + 1});
                this.setState({corrected: true});
            } else {
              this.setState({incorrect: this.state.incorrect + 1});
              this.setState({corrected: false});
            }
        }
    }

    generateQuestion() {
        let gramDec = this.state.question.gramDec;
        return this.state.question.isTrigram ? <Trigram data={ {gramDec} } /> : <Hexagram data={ {gramDec} } />;
    }

    generateChoices(t) {
        let ret = [];
        let choices = this.state.question.choices;
        for (var i = 0; i < choices.length; i++) {
            let gramDec = choices[i];
            let choiceText = this.state.question.isTrigram ? trigramName(t, gramDec) : hexagramName(t, gramDec);
            if (i) ret.push(<Button.Or text={t('hexagram.quiz.or')} />);
            ret.push(
                <Button onClick={()=>this.handleAnswerClick(gramDec)}>
                { this.state.answered && gramDec == this.state.question.answer && <Icon name='check' /> }
                { choiceText}
                </Button>
            );
        }
        return <ButtonGroup>{ret}</ButtonGroup>;
    }

    generateAnswerResult() {
        return this.state.corrected
        ? <Label color='green'><Icon name='thumbs up' /></Label>
        : <Label color='red'><Icon name='thumbs down' /></Label>
    }

    render() {
        const { t, i18n, user } = this.props;
        return (
          <Container>
            <Message color='olive'>
            {t('hexagram.page5')}
            </Message>
            <div>
                <Segment textAlign='left'>
                    <Label as='a' color='red' size='big'>
                        {t('hexagram.quiz.incorrect')}
                        <Label.Detail>{this.state.incorrect}</Label.Detail>
                    </Label>
                    <Label as='a' color='green' size='big'>
                        {t('hexagram.quiz.correct')}
                        <Label.Detail>{this.state.correct}</Label.Detail>
                    </Label>
                    <Container textAlign='center'>{ this.generateQuestion() }</Container>
                    <Segment textAlign='center'>{ this.generateChoices(t) }
                        { this.state.answered && this.generateAnswerResult() }
                    </Segment>
                    <Container textAlign='right'>
                    { this.state.answered && <Button primary onClick={()=>this.handleNextClick()} >{t('hexagram.quiz.next')}</Button> }
                    </Container>
                </Segment>
            </div>
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

const connectedPage5 = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Page5);
export { connectedPage5 as Page5 };
