import sys
import json
import pandas as pd

def analyze():
    try:
        input_data = sys.stdin.read()
        
        if not input_data:
            print(json.dumps([]))
            return
            
        history_list = json.loads(input_data)
        
        if not history_list or len(history_list) == 0:
            print(json.dumps([]))
            return

        df = pd.DataFrame(history_list)

        df['createdAt'] = pd.to_datetime(df['createdAt'])
        df['date'] = df['createdAt'].dt.date.astype(str)

        analysis = df.pivot_table(
            index='date', 
            columns='category', 
            values='amount', 
            aggfunc='sum'
        ).fillna(0)

        for cat in ['Mind', 'Physical', 'Social']:
            if cat not in analysis.columns:
                analysis[cat] = 0.0

        result_df = analysis.sort_index().reset_index()

        print(json.dumps(result_df.to_dict(orient='records')))

    except Exception as e:
        print(json.dumps([]))

if __name__ == "__main__":
    analyze()