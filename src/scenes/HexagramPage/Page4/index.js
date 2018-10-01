import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { flowRight } from 'lodash';
import { Button, Container, Icon, Label, Message, Segment, ButtonGroup } from 'semantic-ui-react';
import { Trigram, Hexagram, hexagramName } from 'components';
import { shuffle, getRandomInt } from 'helpers';

class Page4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { choiceCount:5, correct:0, incorrect:0 };
        this.state.questions = this.getBaseQuestions();
        this.state.question = this.getNextQuestion();
    }

    getAnswer(base, variant) {
        return this.state.questions.bases[base][1] ^ this.state.questions.variants[variant];
    }

    getBaseQuestions() {
        let bases = [[7,63], [4,36], [2,18], [1,9], [0,0], [3,27], [5,45], [6,54]];
        let variants = [ 32, 48, 56, 60, 62, 58, 2 ];
        return { bases, variants };
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
        let base = getRandomInt(this.state.questions.bases.length);
        let variant = getRandomInt(this.state.questions.variants.length);
        let answer = this.getAnswer(base, variant);
        return { base, variant, answer };
    }

    getChoices(question) {
        let choices = [];
        choices.push(question.answer);
        let max = 64;
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

    generateQuestion(t) {
        let ret = [];
        let gramDecs = this.state.questions.bases[this.state.question.base];
        ret.push(<Trigram data={ { t, showName:true, gramDec: gramDecs[0], nameType: 'gongTrigramName' } } />);
        ret.push(<Hexagram data={ { t, showName:true, gramDec: gramDecs[1] } } />);
        ret.push(<Icon name='plus' />);
        let gramDec = this.state.questions.variants[this.state.question.variant];
        ret.push(<Hexagram data={ { t, showName: true, gramDec, nameType: 'gongHexagramName'  }} />);
        return ret;
    }

    generateChoices(t) {
        let ret = [];
        let choices = this.state.question.choices;
        for (var i = 0; i < choices.length; i++) {
            let gramDec = choices[i];
            let choiceText = hexagramName(t, gramDec);
            if (i) ret.push(<Button.Or text={t('hexagram.quiz.or')} />);
            ret.push(
                <Button onClick={()=>this.handleAnswerClick(gramDec)}>
                { this.state.answered && gramDec == this.state.question.answer && <Icon name='check' /> }
                { choiceText }
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
            {t('hexagram.page4')}
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
                    <Container textAlign='center'>{ this.generateQuestion(t) }</Container>
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

const connectedPage4 = flowRight(
  translate('translations'),
  connect(mapStateToProps)
)(Page4);
export { connectedPage4 as Page4 };
