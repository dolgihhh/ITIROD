"""added cascade delete favourite_flats

Revision ID: 240d13dad95c
Revises: 3852fe33d809
Create Date: 2023-04-09 22:03:10.182618

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '240d13dad95c'
down_revision = '3852fe33d809'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('favourites_flat_id_fkey', 'favourites', type_='foreignkey')
    op.create_foreign_key(None, 'favourites', 'flats', ['flat_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'favourites', type_='foreignkey')
    op.create_foreign_key('favourites_flat_id_fkey', 'favourites', 'flats', ['flat_id'], ['id'])
    # ### end Alembic commands ###
