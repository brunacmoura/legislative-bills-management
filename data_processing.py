import pandas as pd

bills_df = pd.read_csv("data/bills.csv")
legislators_df = pd.read_csv("data/legislators.csv")
votes_df = pd.read_csv("data/votes.csv")
vote_results_df = pd.read_csv("data/vote_results.csv")


def process_legislators():
    legislator_votes = vote_results_df.groupby("legislator_id")["vote_type"].value_counts().unstack(fill_value=0)

    results = legislators_df.copy()
    results["supported_bills"] = results["id"].map(lambda x: int(legislator_votes.get(1, {}).get(x, 0)))
    results["opposed_bills"] = results["id"].map(lambda x: int(legislator_votes.get(2, {}).get(x, 0)))

    response = results[["id", "name", "supported_bills", "opposed_bills"]].to_dict(orient="records")

    return response
