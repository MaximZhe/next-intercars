import { IItemNewsPageProps, IItemSalesPageProps, IRouteItem, ISliderRoute } from "../types/types";
import { IAccordionItem } from "../types/types";

export const accordionItemsLeft: IAccordionItem[] = [
  {
    id: 1,
    title: "Как забронировать автобусную поездку на InterCars?",
    content:
      "Передвигаться на автобусах дешево и безопасно. Также автобусы позволяют доехать практически до любого места назначения. На сайте доступны сотни рейсов. Вы можете забронировать поездку на автобусе заранее. Просто отмените бронь при изменении планов.",
  },
  {
    id: 2,
    title: "Преимущества поездок на автобусах",
    content:
      "Передвигаться на автобусах дешево и безопасно. Также автобусы позволяют доехать практически до любого места назначения. На сайте доступны сотни рейсов. Вы можете забронировать поездку на автобусе заранее. Просто отмените бронь при изменении планов.",
  },
  {
    id: 3,
    title: "Дорого ли стоят поездки на общественном автотранспорте?",
    content:
      "Передвигаться на автобусах дешево и безопасно. Также автобусы позволяют доехать практически до любого места назначения. На сайте доступны сотни рейсов. Вы можете забронировать поездку на автобусе заранее. Просто отмените бронь при изменении планов.",
  },
];
export const accordionItemsRight: IAccordionItem[] = [
  {
    id: 4,
    title: "Нужно ли распечатывать билеты после покупки?",
    content:
      "Передвигаться на автобусах дешево и безопасно. Также автобусы позволяют доехать практически до любого места назначения. На сайте доступны сотни рейсов. Вы можете забронировать поездку на автобусе заранее. Просто отмените бронь при изменении планов.",
  },
  {
    id: 5,
    title: "Можно ли выбрать место в автобусе?",
    content:
      "Передвигаться на автобусах дешево и безопасно. Также автобусы позволяют доехать практически до любого места назначения. На сайте доступны сотни рейсов. Вы можете забронировать поездку на автобусе заранее. Просто отмените бронь при изменении планов.",
  },
  {
    id: 6,
    title: "Как купить билет?",
    content:
      "Передвигаться на автобусах дешево и безопасно. Также автобусы позволяют доехать практически до любого места назначения. На сайте доступны сотни рейсов. Вы можете забронировать поездку на автобусе заранее. Просто отмените бронь при изменении планов.",
  },
];

export const routesItems: IRouteItem[] = [
  { id: 1, value: "Санкт-Петербург–Минск" },
  { id: 2, value: "Санкт-Петербург–Гомель" },
  { id: 3, value: "Москва-Брянск" },
  { id: 4, value: "Санкт-Петербург–Брянск" },
  { id: 5, value: "Брянск-Симферополь" },
  { id: 6, value: "Москва-Варшава" },
  { id: 7, value: "Санкт-Петербург-Варшава" },
  { id: 8, value: "Москва-Казань" },
];

export const sliderRoutesRussia: ISliderRoute[] = [
  { id: 1, value: "Москва", price: 2653 },
  { id: 2, value: "Санкт-Петербург", price: 1460 },
  { id: 3, value: "Смоленск", price: 1365 },
  { id: 4, value: "Казань", price: 2700 },
  { id: 5, value: "Ростов", price: 1840 },
  { id: 6, value: "Краснодар", price: 2200 },
  { id: 7, value: "Воронеж", price: 1980 },
];
export const sliderRoutesInternational: ISliderRoute[] = [
  { id: 1, value: "Варшава", price: 2653 },
  { id: 2, value: "Берлин", price: 1460 },
  { id: 3, value: "Таллин", price: 1365 },
  { id: 4, value: "Кунас", price: 2700 },
  { id: 5, value: "Вильнюс", price: 1840 },
  { id: 6, value: "Рига", price: 2200 },
  { id: 7, value: "Стокгольм", price: 1980 },
];
export const SalesPageListData: IItemSalesPageProps[] = [
  {
    id: 1,
    date: new Date(),
    title: "В Санкт-Петербург и обратно вместе с Intercars!",
    startSale: {
      dateStart: new Date(),
      timeStart: new Date(),
    },
  },
  {
    id: 2,
    date: new Date(),
    title: "Акция в Будапешт и обратно со скидкой",
    startSale: {
      dateStart: new Date(),
      timeStart: new Date(),
    },
  },
  {
    id: 3,
    date: new Date(),
    title: "В Санкт-Петербург и обратно вместе с Intercars!",
    startSale: {
      dateStart: new Date(),
      timeStart: new Date(),
    },
  },
  {
    id: 4,
    date: new Date(),
    title: "Акция: в Варшаву и обратно с 50% скидкой",
    startSale: {
      dateStart: new Date(),
      timeStart: new Date(),
    },
  },
  {
    id: 5,
    date: new Date(),
    title: "В Санкт-Петербург и обратно вместе с Intercars!",
    startSale: {
      dateStart: new Date(),
      timeStart: new Date(),
    },
  },
  {
    id: 6,
    date: new Date(),
    title: "Акция: в Варшаву и обратно с 50% скидкой",
    startSale: {
      dateStart: new Date(),
      timeStart: new Date(),
    },
  },
];
export const salesSingleListInfo: string[] = [
  "Количество мест по акционной цене ограничено и зависит от даты рейса.",
  "Акционные билеты по инициативе пассажиров возврату не подлежат.",
  "Возможен перенос даты выезда с доплатой до полной стоимости.",
  "Спецпредложения не суммируются с другими акциями, скидками и льготными тарифами.",
  "Акционные промокоды работают при покупке билета только в одном направлении и только на одного пассажира, билет в обратную сторону и на другого пассажира по промокоду вы можете купить отдельно.",
];

export const NewsPageListData: IItemNewsPageProps[] = [
  {
    id: 1,
    date: new Date(),
    mainTitle: "Как выбрать бак-аккумулятор для отопительной системы",
    content: [
      {
        title:'',
        text:`Твердотопливные котлы, а тем более – зелёные источники энергии, не отличаются высокой стабильностью работы. Котлы долго выходят на рабочий режим, и достаточно быстро остывают. А солнечные концентраторы или электрокотлы, подключённые к ветрогенераторам, могут не работать в течение длительного времени. Поэтому в частных домах рационально использовать баки-аккумуляторы, которые позволяют нивелировать колебания температуры, создав в доме постоянное тепло.
        Найти любое оборудование для переоборудования дома под зелёную энергетику, в том числе, баки-аккумуляторы, вы можете на сайте e-solarpower.ru.`
      },
      {
        title:'На что обратить внимание при выборе',
        text:`Главный критерий выбора теплового накопителя – его совместимость с отопительной системой. Совместимость определяется по нескольким факторам, главные из которых – объем и предел давления.
        Производители котлов и солнечных коллекторов указывают объем теплового накопителя, который необходим для эффективной работы системы. Если вы планируете использовать бак для хозяйственных нужд, а не только для отопления, стоит выбирать агрегат увеличенного объема.
        Также на совместимость с системой отопления влияет такой показатель как предел давления. Если выбрать модель накопителя, предел давления которой будет ниже, чем рабочее давление в отопительной системе, может произойти разрушение корпуса.
        Помимо этого, необходимо учесть массу и габариты бака. В наполненном состоянии данная конструкция может иметь массу свыше тонны, и занимать больше кубического метра пространства.
        Немаловажной характеристикой является и материал изготовления. На сегодняшний день существуют корпуса баков, изготовленные из двух видов сплавов – углеродистой стали и нержавеющей. Накопители из углеродистой стали отличаются низкой ценой, но не долговечны. А баки из нержавеющей стали – напротив, дорого стоят, и не подвержены коррозии.
        И, наконец, главное свойство бака – его способность накапливать тепло, определяется толщиной и материалом теплоизоляции. Чем толще слой теплоизоляции, тем более долгое время аппарат сможет нагревать помещение по инерции.`
      }
    ]
  },
  {
    id: 2,
    date: new Date(),
    mainTitle: "Как выбрать преобразователь для автомобиля",
    content: [
      {
        title:'',
        text:`Твердотопливные котлы, а тем более – зелёные источники энергии, не отличаются высокой стабильностью работы. Котлы долго выходят на рабочий режим, и достаточно быстро остывают. А солнечные концентраторы или электрокотлы, подключённые к ветрогенераторам, могут не работать в течение длительного времени. Поэтому в частных домах рационально использовать баки-аккумуляторы, которые позволяют нивелировать колебания температуры, создав в доме постоянное тепло.
        Найти любое оборудование для переоборудования дома под зелёную энергетику, в том числе, баки-аккумуляторы, вы можете на сайте e-solarpower.ru.`
      },
      
    ]
  },
  {
    id: 3,
    date: new Date(),
    mainTitle: "Как правильно завтракать по утрам",
    content: [
      {
        title:'',
        text:`Твердотопливные котлы, а тем более – зелёные источники энергии, не отличаются высокой стабильностью работы. Котлы долго выходят на рабочий режим, и достаточно быстро остывают. А солнечные концентраторы или электрокотлы, подключённые к ветрогенераторам, могут не работать в течение длительного времени. Поэтому в частных домах рационально использовать баки-аккумуляторы, которые позволяют нивелировать колебания температуры, создав в доме постоянное тепло.
        Найти любое оборудование для переоборудования дома под зелёную энергетику, в том числе, баки-аккумуляторы, вы можете на сайте e-solarpower.ru.`
      },
    ]
  },
  {
    id: 4,
    date: new Date(),
    mainTitle: "Полезные советы для путешествия",
    content: [
      {
        title:'',
        text:`Твердотопливные котлы, а тем более – зелёные источники энергии, не отличаются высокой стабильностью работы. Котлы долго выходят на рабочий режим, и достаточно быстро остывают. А солнечные концентраторы или электрокотлы, подключённые к ветрогенераторам, могут не работать в течение длительного времени. Поэтому в частных домах рационально использовать баки-аккумуляторы, которые позволяют нивелировать колебания температуры, создав в доме постоянное тепло.
        Найти любое оборудование для переоборудования дома под зелёную энергетику, в том числе, баки-аккумуляторы, вы можете на сайте e-solarpower.ru.`
      },
    ]
  },
  {
    id: 5,
    date: new Date(),
    mainTitle: "Что наодиться под льдами арктики",
    content: [
      {
        title:'',
        text:`Твердотопливные котлы, а тем более – зелёные источники энергии, не отличаются высокой стабильностью работы. Котлы долго выходят на рабочий режим, и достаточно быстро остывают. А солнечные концентраторы или электрокотлы, подключённые к ветрогенераторам, могут не работать в течение длительного времени. Поэтому в частных домах рационально использовать баки-аккумуляторы, которые позволяют нивелировать колебания температуры, создав в доме постоянное тепло.
        Найти любое оборудование для переоборудования дома под зелёную энергетику, в том числе, баки-аккумуляторы, вы можете на сайте e-solarpower.ru.`
      },
    ]
  },
  {
    id: 6,
    date: new Date(),
    mainTitle: "Мероприятия в городе на этой неделе",
    content: [
      {
        title:'',
        text:`Твердотопливные котлы, а тем более – зелёные источники энергии, не отличаются высокой стабильностью работы. Котлы долго выходят на рабочий режим, и достаточно быстро остывают. А солнечные концентраторы или электрокотлы, подключённые к ветрогенераторам, могут не работать в течение длительного времени. Поэтому в частных домах рационально использовать баки-аккумуляторы, которые позволяют нивелировать колебания температуры, создав в доме постоянное тепло.
        Найти любое оборудование для переоборудования дома под зелёную энергетику, в том числе, баки-аккумуляторы, вы можете на сайте e-solarpower.ru.`
      },
    ]
  },
];

export const defaultCityForm = {
  Minsk: 'Минск',
  Mosсow: 'Москва'
}
export const defaultDateForm = {
  Today: 'Сегодня',
  Tomorrow: 'Завтра'
}
export const ReviewsData = [
  {
    id:0,
    user:'Александр',
    dateReviews:new Date(),
    question:'На рейс Минск Москва берете пассажиров с украинским паспортом?',
    admin:'Intercars',
    dateResponse: new Date(),
    bodyResponse:'Добрый день, Александр! Границу РБ с Российской Федерацией могут пересекать только граждане Республики Беларусь и Российской Федерации. Граждане других стран могут пересекать границу только через международный пункт пропуска: неофициальное название пункта - "Три сестры", со стороны РБ пропускной пункт называется "Веселовка", на Российской территории – "Новые Юрковичи". Обращаем Ваше внимание, что автобусы компании Intercars не пересекают границу с РФ в международном пункте пропуска, соответственно пассажиров других стран на границе пограничный контроль не пропустит!'

  },
  {
    id:1,
    user:'Анастасия',
    dateReviews:new Date(),
    question:'Добрый день! Подскажите, пожалуйста, почему нет ранних выездов? Только вечерние рейсы?',
    admin:'Intercars',
    dateResponse: new Date(),
    bodyResponse:'Добрый день, Анастасия! В данным момент в продаже есть только вечерние рейсы'

  },
  {
    id:2,
    user:'Александр',
    dateReviews:new Date(),
    question:'На рейс Минск Москва берете пассажиров с украинским паспортом?',
    admin:'Intercars',
    dateResponse: new Date(),
    bodyResponse:'Добрый день, Александр! Границу РБ с Российской Федерацией могут пересекать только граждане Республики Беларусь и Российской Федерации. Граждане других стран могут пересекать границу только через международный пункт пропуска: неофициальное название пункта - "Три сестры", со стороны РБ пропускной пункт называется "Веселовка", на Российской территории – "Новые Юрковичи". Обращаем Ваше внимание, что автобусы компании Intercars не пересекают границу с РФ в международном пункте пропуска, соответственно пассажиров других стран на границе пограничный контроль не пропустит!'

  },
  {
    id:3,
    user:'Анастасия',
    dateReviews:new Date(),
    question:'Добрый день! Подскажите, пожалуйста, почему нет ранних выездов? Только вечерние рейсы?',
    admin:'Intercars',
    dateResponse: new Date(),
    bodyResponse:'Добрый день, Анастасия! В данным момент в продаже есть только вечерние рейсы'

  }
  ,
  {
    id:4,
    user:'Александр',
    dateReviews:new Date(),
    question:'На рейс Минск Москва берете пассажиров с украинским паспортом?',
    admin:'Intercars',
    dateResponse: new Date(),
    bodyResponse:'Добрый день, Александр! Границу РБ с Российской Федерацией могут пересекать только граждане Республики Беларусь и Российской Федерации. Граждане других стран могут пересекать границу только через международный пункт пропуска: неофициальное название пункта - "Три сестры", со стороны РБ пропускной пункт называется "Веселовка", на Российской территории – "Новые Юрковичи". Обращаем Ваше внимание, что автобусы компании Intercars не пересекают границу с РФ в международном пункте пропуска, соответственно пассажиров других стран на границе пограничный контроль не пропустит!'

  },
  {
    id:5,
    user:'Анастасия',
    dateReviews:new Date(),
    question:'Добрый день! Подскажите, пожалуйста, почему нет ранних выездов? Только вечерние рейсы?',
    admin:'Intercars',
    dateResponse: new Date(),
    bodyResponse:'Добрый день, Анастасия! В данным момент в продаже есть только вечерние рейсы'

  }
]
