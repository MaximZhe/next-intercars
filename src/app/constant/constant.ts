import { IItemSalesPageProps, IRouteItem, ISliderRoute } from "../types/types";
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
  { id: 1, value: "Санкт-Петербург–Минск", link: '/find/minsk-moscow' },
  { id: 2, value: "Санкт-Петербург–Гомель", link: '/find/minsk-moscow' },
  { id: 3, value: "Минск-Москва", link: '/find/minsk-moscow' },
  { id: 4, value: "Санкт-Петербург–Брянск", link: '/find/minsk-moscow' },
  { id: 5, value: "Брянск-Симферополь", link: '/find/minsk-moscow' },
  { id: 6, value: "Москва-Варшава", link: '/find/minsk-moscow' },
  { id: 7, value: "Санкт-Петербург-Варшава", link: '/find/minsk-moscow' },
  { id: 8, value: "Москва-Казань", link: '/find/minsk-moscow' },
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
