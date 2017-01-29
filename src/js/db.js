const Datastore = require('nedb');

export default class DB {
  constructor() {
    this.db = {};
    this.db.incomes = new Datastore( 'incomes.db' );
    this.db.incomes.loadDatabase();
    this.db.outcomes = new Datastore( 'outcomes.db' );
    this.db.outcomes.loadDatabase();
  }

  getAllIncomes = (callback) => {
    this.db.incomes.find( {}, (err, docs) => {
        if( err !== null ) {
          console.error(err);
          return;
        }
        callback(docs);
    })
  }

  getIncomesInRange = ( minDate, maxDate, callback ) => {
    this.db.incomes.find( { "date": { $gte: minDate, $lte: maxDate } }, ( err, docs ) => {
      if ( err !== null) {
          console.error(err);
          return;
      }
      callback(docs);
    })
  }

  insertIncome = ( income ) => {
    this.db.incomes.insert( income, (err, newDoc) => {
      if( err !== null ) {
        console.error( err );
        return null;
      }
      return newDoc._id;
    });
  }

  updateIncome = ( income ) => {
    this.db.incomes.update( { _id: income._id }, income, {}, (err, numReplaced) => {
        if ( err !== null ) {
          console.error( err );
          return null;
        }
        return numReplaced;
    });
  }

  deleteIncome = ( income ) => {
    this.db.incomes.remove(  { _id: income._id }, (err, numRemoved) => {
      if( err !== null ) {
        console.error( err );
        return null;
      }
      return numRemoved;
    });
  }

  getAllOutcomes = (callback) => {
    let result = [];
    this.db.outcomes.find( {}, (err, docs) => {
        if( err !== null ) {
          console.error(err);
          return;
        }
        callback(docs);
    })
  }

  getOutcomesInRange = ( minDate, maxDate, callback ) => {
    this.db.outcomes.find( { "date": { $gte: minDate, $lte: maxDate } }, ( err, docs ) => {
      if ( err !== null) {
          console.error(err);
          return;
      }
      callback(docs);
    })
  }


  insertOutcome = ( outcome ) => {
    this.db.outcomes.insert( outcome, (err, newDoc) => {
      if( err !== null ) {
        console.error( err );
        return null;
      }
      return newDoc._id;
    });
  }

  updateOutcome = ( outcome ) => {
    this.db.outcomes.update( { _id: outcome._id }, outcome, {}, (err, numReplaced) => {
        if ( err !== null ) {
          console.error( err );
          return null;
        }
        return numReplaced;
    });
  }

  deleteOutcome = ( outcome ) => {
    this.db.outcomes.remove(  { _id: outcome._id }, (err, numRemoved) => {
      if( err !== null ) {
        console.error( err );
        return null;
      }
      return numRemoved;
    });
  }
}
