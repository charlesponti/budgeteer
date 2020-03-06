# Run tests with coverage
python -m \
    coverage run \
    --source=project \
    --omit=**/site-packages/** \
    -m py.test

coverage html
