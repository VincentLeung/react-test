import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Icon, Label, Message, Segment, ButtonGroup } from 'semantic-ui-react';
import { Trigram, Hexagram, trigramName, hexagramName } from 'components';
import { shuffle, getRandomInt } from 'helpers';

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { choiceCount:5, correct:0, incorrect:0 };
        this.state.question = this.getNextQuestion();
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
        return { gramDec, isTrigram };
    }

    getChoices(question) {
        let choices = [];
        choices.push(question.gramDec);
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
            if (answer == this.state.question.gramDec) {
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
                { this.state.answered && gramDec == this.state.question.gramDec && <Icon name='check' /> }
                { choiceText}
                </Button>
            );
        }
        return <ButtonGroup>{ret}</ButtonGroup>;
    }

    render() {
        const { t, i18n, user } = this.props;
        return (
          <Container>
            <Message color='olive'>
            {t('hexagram.page2')}
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
                        { this.state.answered && this.state.corrected && <Label color='green'><Icon name='thumbs up' /></Label> }
                        { this.state.answered && !this.state.corrected && <Label color='red'><Icon name='thumbs down' /></Label> }
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

const connectedPage2 = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Page2);
export { connectedPage2 as Page2 };
