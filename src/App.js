import React, {useState} from 'react';
import moment from 'moment'

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            {<DateTimeWithSubscription date={props.date}/>}
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date}/>);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2022-05-02 00:24:59'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list}/>
    );
}

function DateTimePretty(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            let {date} = props
            const dataMoment = moment(date);

            const hour = moment().add(-1, 'hour');
            const day = moment().add(-1, 'day');
            if (dataMoment.isAfter(hour)) {
                date = '12 минут назад'
            } else if (dataMoment.isBetween(day, hour)) {
                date = '5 часов назад'
            } else {
                date = moment().diff(dataMoment, 'day') + ' дней назад'
            }

            this.date = date;
        }

        render() {
            return <WrappedComponent {...this.props} date={this.date}/>;
        }
    }
}

const DateTimeWithSubscription = DateTimePretty(DateTime)